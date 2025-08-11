# Supabase Setup Guide for Regrowx

This guide will help you set up Supabase for your Regrowx application.

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up/Sign in to your account
3. Click "New Project"
4. Choose your organization
5. Fill in project details:
   - Name: `regrowx-production` (or your preferred name)
   - Database Password: Generate a strong password
   - Region: Choose closest to your users (e.g., `us-east-1` for US, `eu-west-1` for Europe)
6. Click "Create new project"

## 2. Get Your Project Credentials

Once your project is created:

1. Go to Settings → API
2. Copy the following values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **Project API Keys**:
     - `anon` `public` key (for client-side)
     - `service_role` `secret` key (for server-side, keep this secure!)

## 3. Set Up Environment Variables

Create a `.env.local` file in your project root:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Other configurations...
```

## 4. Set Up Database Schema

1. Go to your Supabase dashboard
2. Click on "SQL Editor" in the sidebar
3. Copy the entire contents of `lib/database-schema.sql`
4. Paste it into the SQL editor
5. Click "Run" to execute the schema

This will create:
- All necessary tables (users, products, orders, hair_analyses, testimonials, articles)
- Row Level Security (RLS) policies
- Indexes for performance
- Sample data for testing

## 5. Configure Authentication

### Email Authentication (Default)
Email auth is enabled by default. Users can sign up with email/password.

### Social Authentication (Optional)
To enable Google/Facebook login:

1. Go to Authentication → Providers
2. Enable the providers you want:

**For Google:**
- Enable Google provider
- Add your Google OAuth credentials:
  - Client ID: From Google Cloud Console
  - Client Secret: From Google Cloud Console
- Add redirect URL: `https://your-project-id.supabase.co/auth/v1/callback`

**For Facebook:**
- Enable Facebook provider
- Add your Facebook App credentials
- Add redirect URL: `https://your-project-id.supabase.co/auth/v1/callback`

## 6. Configure Storage (Optional)

If you plan to store images:

1. Go to Storage
2. Create a new bucket called `product-images`
3. Set up policies for public read access:

```sql
-- Allow public read access to product images
CREATE POLICY "Public read access" ON storage.objects
FOR SELECT USING (bucket_id = 'product-images');

-- Allow authenticated users to upload
CREATE POLICY "Authenticated upload" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');
```

## 7. Test Your Setup

1. Install dependencies: `npm install`
2. Start your development server: `npm run dev`
3. Try creating an account on your website
4. Check the Supabase dashboard to see if the user was created

## 8. Production Deployment

When deploying to production:

1. Update your environment variables with production URLs
2. Update the `NEXT_PUBLIC_SITE_URL` to your production domain
3. Configure your authentication redirect URLs in Supabase dashboard
4. Set up proper CORS settings if needed

## 9. Security Checklist

- ✅ RLS is enabled on all tables
- ✅ Service role key is kept secure (server-side only)
- ✅ Anon key is used for client-side operations
- ✅ Authentication is properly configured
- ✅ Database policies are restrictive and secure

## 10. Monitoring and Maintenance

- Monitor your database usage in the Supabase dashboard
- Set up alerts for high usage
- Regularly backup your database
- Monitor authentication logs for suspicious activity

## Troubleshooting

### Common Issues:

1. **"Invalid API key"**: Check your environment variables
2. **"Row Level Security violation"**: Check your RLS policies
3. **"Schema not found"**: Make sure you ran the database schema
4. **Authentication not working**: Check your redirect URLs

### Getting Help:

- Supabase Documentation: https://supabase.com/docs
- Supabase Discord: https://discord.supabase.com
- GitHub Issues: https://github.com/supabase/supabase/issues

## Next Steps

Once Supabase is set up, you can:
- Customize the database schema for your needs
- Add more authentication providers
- Set up real-time subscriptions
- Implement file storage for product images
- Add database functions for complex operations