import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Record, RecordForm, RecordState } from "../types/record";
import api from "../utils/api";

const initialState: RecordState = {
  data: [],
  loading: false,
  error: "",
};

export const asyncGetRecords = createAsyncThunk("records/get", async () => {
  const response = await api().get<Record[]>("/records");

  return response.data.sort((a, b) => b.id - a.id);
});

export const asyncAddRecord = createAsyncThunk(
  "record/add",
  async (form: RecordForm) => {
    const response = await api().post<Record>("/records", form);

    return response.data;
  }
);
export const asyncUpdateRecord = createAsyncThunk(
  "record/update",
  async (form: RecordForm) => {
    const response = await api().put<Record>(`/records/${form.recordId}`, {
      title: form.title,
      amount: form.amount,
      category_id: form.category_id,
    });

    return response.data;
  }
);
export const asyncDeleteRecord = createAsyncThunk(
  "record/delete",
  async (recordId: number) => {
    await api().delete<Record>(`/records/${recordId}`);
    return recordId;
  }
);

const recordSlice = createSlice({
  name: "records",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET RECORDS
    builder.addCase(asyncGetRecords.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(asyncGetRecords.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(asyncGetRecords.rejected, (state, action) => {
      state.loading = false;
      state.error = action.type;
    });
    // ADD RECORD
    builder.addCase(asyncAddRecord.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(asyncAddRecord.fulfilled, (state, action) => {
      state.data.splice(0, 0, action.payload);
      state.loading = false;
      state.error = "";
    });
    builder.addCase(asyncAddRecord.rejected, (state, action) => {
      state.loading = false;
      state.error = action.type;
    });
    // UPDATE RECORD
    builder.addCase(asyncUpdateRecord.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(asyncUpdateRecord.fulfilled, (state, action) => {
      state.data = state.data.map((record) =>
        record.id === action.payload.id ? action.payload : record
      );
      state.loading = false;
      state.error = "";
    });
    builder.addCase(asyncUpdateRecord.rejected, (state, action) => {
      state.loading = false;
      state.error = action.type;
    });
    // DELETE RECORD
    builder.addCase(asyncDeleteRecord.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(asyncDeleteRecord.fulfilled, (state, action) => {
      state.data = state.data.filter((ctg) => ctg.id !== action.payload);
      state.loading = false;
      state.error = "";
    });
    builder.addCase(asyncDeleteRecord.rejected, (state, action) => {
      state.loading = false;
      state.error = action.type;
    });
  },
});

// export const {} = categorySlice.actions
export default recordSlice.reducer;
