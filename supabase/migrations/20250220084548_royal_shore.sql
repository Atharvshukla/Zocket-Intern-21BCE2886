/*
  # TaskAI Schema with Vector Store Support

  1. New Tables
    - `users` - User profiles and settings
      - `id` (uuid, matches auth.users)
      - `email` (text)
      - `created_at` (timestamp)
    
    - `tasks` - User tasks
      - `id` (uuid)
      - `user_id` (uuid, references users)
      - `title` (text)
      - `description` (text)
      - `status` (text)
      - `priority` (text)
      - `due_date` (timestamp)
      - `created_at` (timestamp)
    
    - `documents` - Uploaded task documents
      - `id` (uuid)
      - `user_id` (uuid, references users)
      - `task_id` (uuid, references tasks)
      - `name` (text)
      - `content` (text)
      - `created_at` (timestamp)
    
    - `document_embeddings` - Vector embeddings for RAG
      - `id` (uuid)
      - `document_id` (uuid, references documents)
      - `embedding` (vector(768))
      - `chunk_content` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Enable pgvector extension
create extension if not exists vector;

-- Users table
create table if not exists users (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  created_at timestamptz default now()
);

alter table users enable row level security;

create policy "Users can read own data"
  on users
  for select
  to authenticated
  using (auth.uid() = id);

-- Tasks table
create table if not exists tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users on delete cascade not null,
  title text not null,
  description text,
  status text not null default 'pending',
  priority text not null default 'medium',
  due_date timestamptz,
  created_at timestamptz default now()
);

alter table tasks enable row level security;

create policy "Users can CRUD own tasks"
  on tasks
  for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Documents table
create table if not exists documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users on delete cascade not null,
  task_id uuid references tasks on delete cascade not null,
  name text not null,
  content text not null,
  created_at timestamptz default now()
);

alter table documents enable row level security;

create policy "Users can CRUD own documents"
  on documents
  for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Document embeddings table with vector support
create table if not exists document_embeddings (
  id uuid primary key default gen_random_uuid(),
  document_id uuid references documents on delete cascade not null,
  embedding vector(768),
  chunk_content text not null,
  created_at timestamptz default now()
);

alter table document_embeddings enable row level security;

create policy "Users can read own document embeddings"
  on document_embeddings
  for select
  to authenticated
  using (
    exists (
      select 1 from documents
      where documents.id = document_embeddings.document_id
      and documents.user_id = auth.uid()
    )
  );

-- Create indexes for better query performance
create index if not exists tasks_user_id_idx on tasks(user_id);
create index if not exists documents_user_id_idx on documents(user_id);
create index if not exists documents_task_id_idx on documents(task_id);
create index if not exists document_embeddings_document_id_idx on document_embeddings(document_id);

-- Create vector similarity search index
create index if not exists document_embeddings_vector_idx 
  on document_embeddings 
  using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);