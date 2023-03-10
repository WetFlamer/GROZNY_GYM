import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: false,
  successfully: null,
  users: [],
  token: localStorage.getItem("token"),
  id: localStorage.getItem("id"),
};
// GET
export const fetchUser = createAsyncThunk("fetch/user", async (_, thunkAPI) => {
  try {
    const res = await fetch("/users", {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${thunkAPI.getState().users.token}`,
      },
    });
    const users = await res.json();
    if (users.error) {
      return thunkAPI.rejectWithValue(users.error);
    }
    return thunkAPI.fulfillWithValue(users);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
// POST ВХОД
export const authSignIn = createAsyncThunk(
  "auth/signIn",
  async ({ login, password }, thunkAPI) => {
    try {
      const res = await fetch("/login", {
        method: "POST",
        headers: {
          "content-type": "application",
        },
        body: JSON.stringify({ login, password }),
      });
      const user = await res.json();
      if (user.error) {
        return thunkAPI.rejectWithValue(user.error);
      }
      localStorage.setItem("token", user.token);
      localStorage.setItem("id", user.id);
      return thunkAPI.fulfillWithValue(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// POST РЕГИСТРАЦИЯ
export const authSignUp = createAsyncThunk(
  "auth/signUp",
  async ({ login, password }, thunkAPI) => {
    try {
      const res = await fetch("/registration", {
        method: "POST",
        headers: {
          "content-type": "application",
        },
        body: JSON.stringify({ login, password }),
      });
      const user = await res.json();
      if (user.error) {
        return thunkAPI.rejectWithValue(user.error);
      }
      return thunkAPI.fulfillWithValue(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchUser.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        action.payload.map((item) => {
          if (item._id === localStorage.getItem("id")) {
            state.users = item;
          }
          return state.users;
        }); 
      })
      // POST ВХОД
      .addCase(authSignIn.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(authSignIn.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(authSignIn.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
      })
      // POST РЕГИСТРАЦИЯ
      .addCase(authSignUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.successfully = null;
      })
      .addCase(authSignUp.pending, (state, action) => {
        state.loading = true;
        state.error = false;
        state.successfully = null;
      })
      .addCase(authSignUp.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.successfully = action.payload;
      });
  },
});

export default usersSlice.reducer;
