-- Add is_best_seller column to books table
ALTER TABLE public.books ADD COLUMN IF NOT EXISTS is_best_seller boolean DEFAULT false;
