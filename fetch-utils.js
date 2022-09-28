const SUPABASE_URL = 'https://nwxkvnsiwauieanvbiri.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNzAwMzQzNCwiZXhwIjoxOTUyNTc5NDM0fQ.8XIsU0FANdaNeQnT-DojpTL-GTlTPZ4CYZDEetpFpWc';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */

export async function createTodo(todo) {
    // > Part A: Insert the todo in supabase, returns a single row
    return await client.from('todos').insert(todo).single();
}

export async function getTodos() {
    // > Part B: Get all todos for this user from supabase
    return await client.from('todos').select('*').order('created_at');
}

export async function completeTodo(id) {
    // > Part C: call update (set complete to true) for the todo that
    // matches the correct id. Returns a single record:
    return await client
        .from('todos')
        .update({ complete: true })
        .eq('id', id)
        .single();
}

export async function deleteAllTodos() {
    const user = getUser();

    // > Part D: delete all todos for this user in supabase:
    return await client.from('todos').delete().eq('user_id', user.id);
    // Supabase doesn't allow deleting without a where clause,
    // which is a good thing it most cases because we generally
    // don't want to delete every single row from the database.
    //
    // Let's use this as an opportunity to talk about what
    // Row Level Security (RLS) does for us automatically,
    // which is appending a condition on the server that does
    // what this ".eq" does.
    //
    // But the supabase client in the browser doesn't know about this,
    // so it helps us by making sure we aren't deleting the whole table!

    // Use this to add the user id as a "where" criteria filter:
    // .eq('user_id', user.id);
}
