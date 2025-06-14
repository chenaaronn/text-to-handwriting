-- Create users table (extends Supabase auth.users)
create table public.profiles (
	id uuid references auth.users on delete cascade not null primary key,
	username text unique,
	full_name text,
	avatar_url text,
	created_at timestamp with time zone default timezone('utc'::text, now()) not null,
	updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
-- Create handwriting samples table
create table public.handwriting_samples (
	id uuid default gen_random_uuid() primary key,
	user_id uuid references public.profiles(id) on delete cascade not null,
	name text not null,
	storage_path text not null,
	created_at timestamp with time zone default timezone('utc'::text, now()) not null,
	updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
-- Create generated outputs table
create table public.generated_outputs (
	id uuid default gen_random_uuid() primary key,
	user_id uuid references public.profiles(id) on delete cascade not null,
	sample_id uuid references public.handwriting_samples(id) on delete cascade not null,
	text_content text not null,
	storage_path text not null,
	created_at timestamp with time zone default timezone('utc'::text, now()) not null,
	updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
-- Enable Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.handwriting_samples enable row level security;
alter table public.generated_outputs enable row level security;
-- Create policies
create policy "Users can view their own profile" on public.profiles for
select using (auth.uid() = id);
create policy "Users can update their own profile" on public.profiles for
update using (auth.uid() = id);
create policy "Users can view their own handwriting samples" on public.handwriting_samples for
select using (auth.uid() = user_id);
create policy "Users can insert their own handwriting samples" on public.handwriting_samples for
insert with check (auth.uid() = user_id);
create policy "Users can delete their own handwriting samples" on public.handwriting_samples for delete using (auth.uid() = user_id);
create policy "Users can view their own generated outputs" on public.generated_outputs for
select using (auth.uid() = user_id);
create policy "Users can insert their own generated outputs" on public.generated_outputs for
insert with check (auth.uid() = user_id);
create policy "Users can delete their own generated outputs" on public.generated_outputs for delete using (auth.uid() = user_id);
-- Create storage buckets
insert into storage.buckets (id, name, public)
values (
		'handwriting-samples',
		'handwriting-samples',
		false
	),
	('generated-outputs', 'generated-outputs', false),
	('user-profiles', 'user-profiles', false);
-- Set up storage policies
create policy "Users can upload their own handwriting samples" on storage.objects for
insert with check (
		bucket_id = 'handwriting-samples'
		and auth.uid() = (storage.foldername(name)) [1]::uuid
	);
create policy "Users can view their own handwriting samples" on storage.objects for
select using (
		bucket_id = 'handwriting-samples'
		and auth.uid() = (storage.foldername(name)) [1]::uuid
	);
create policy "Users can upload their own generated outputs" on storage.objects for
insert with check (
		bucket_id = 'generated-outputs'
		and auth.uid() = (storage.foldername(name)) [1]::uuid
	);
create policy "Users can view their own generated outputs" on storage.objects for
select using (
		bucket_id = 'generated-outputs'
		and auth.uid() = (storage.foldername(name)) [1]::uuid
	);
create policy "Users can upload their own profile images" on storage.objects for
insert with check (
		bucket_id = 'user-profiles'
		and auth.uid() = (storage.foldername(name)) [1]::uuid
	);
create policy "Users can view their own profile images" on storage.objects for
select using (
		bucket_id = 'user-profiles'
		and auth.uid() = (storage.foldername(name)) [1]::uuid
	);