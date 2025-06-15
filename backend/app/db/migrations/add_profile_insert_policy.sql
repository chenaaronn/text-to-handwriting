-- Add policy to allow users to insert their own profile
create policy "Users can insert their own profile" on public.profiles for
insert with check (auth.uid() = id);
-- Add policy to allow service role to insert profiles
create policy "Service role can insert profiles" on public.profiles for
insert to service_role with check (true);