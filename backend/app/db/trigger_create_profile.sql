-- Function to create profile when user confirms email
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, avatar_url)
  VALUES (
    NEW.id, 
    split_part(NEW.email, '@', 1), -- Use email prefix as username
    split_part(NEW.email, '@', 1), -- Use email prefix as full_name
    NULL
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Set the function owner to service_role to bypass RLS
ALTER FUNCTION public.handle_new_user() OWNER TO service_role;

-- Trigger to call the function when user confirms email
CREATE OR REPLACE TRIGGER on_auth_user_confirmed
  AFTER UPDATE ON auth.users
  FOR EACH ROW
  WHEN (OLD.email_confirmed_at IS NULL AND NEW.email_confirmed_at IS NOT NULL)
  EXECUTE FUNCTION public.handle_new_user();