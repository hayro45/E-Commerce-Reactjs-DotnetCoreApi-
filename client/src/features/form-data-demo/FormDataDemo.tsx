import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import {
  Alert, Box, Button, Container, CssBaseline, FormControl, FormHelperText,
  InputLabel, MenuItem, Select, Stack, Typography,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";

interface CategoryOption { id: string; label: string }
interface SubmissionResult { categories: string[] }

export default function FormDataDemo() {
  const [options, setOptions] = useState<CategoryOption[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [result, setResult] = useState<SubmissionResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    async function loadOptions() {
      try {
        const response = await fetch("/api/form-data-demo/options", { signal: controller.signal });
        if (!response.ok) throw new Error("Could not load categories. Check that the demo API is running.");
        const data: CategoryOption[] = await response.json();
        setOptions(data);
      } catch (cause) {
        if (!controller.signal.aborted) setError(cause instanceof Error ? cause.message : "Could not load categories.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    void loadOptions();
    return () => controller.abort();
  }, []);

  function handleChange(event: SelectChangeEvent<string[]>) {
    const value = event.target.value;
    // MUI's autofill path can produce a string. Match an entire known ID,
    // rather than splitting on commas, because commas can be part of an ID.
    setCategories(typeof value === "string" ? options.filter(option => option.id === value).map(option => option.id) : value);
    setResult(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setSubmitting(true);
    setError("");
    setResult(null);
    try {
      const response = await fetch("/api/form-data-demo", { method: "POST", body: formData });
      if (!response.ok) {
        const problem = await response.json();
        const messages = Object.values(problem.errors ?? {}).flat().join(" ");
        throw new Error(messages || "The form could not be submitted.");
      }
      setResult(await response.json());
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "The form could not be submitted.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ py: 5 }}>
        <Stack spacing={3}>
          <Box>
            <Typography component="h1" variant="h4" gutterBottom>Multiple selection form</Typography>
            <Typography color="text.secondary">A React + .NET form submission demo. Selections are validated and returned by the API; nothing is saved.</Typography>
          </Box>
          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <FormControl fullWidth disabled={loading || submitting}>
                <InputLabel id="category-label">Categories</InputLabel>
                <Select<string[]>
                  labelId="category-label"
                  id="category-select"
                  label="Categories"
                  multiple
                  value={categories}
                  onChange={handleChange}
                  inputProps={{ "aria-describedby": "category-help" }}
                >
                  {options.map(option => <MenuItem key={option.id} value={option.id}>{option.label}</MenuItem>)}
                </Select>
                <FormHelperText id="category-help">Choose any categories, or submit an empty selection. “Home, garden” is a single value.</FormHelperText>
              </FormControl>
              {categories.map(category => <input key={category} type="hidden" name="categories" value={category} />)}
              <Stack direction="row" spacing={2}>
                <Button type="submit" variant="contained" disabled={loading || submitting || options.length === 0}>{submitting ? "Submitting…" : "Submit selection"}</Button>
                <Button type="button" disabled={submitting} onClick={() => { setCategories([]); setResult(null); }}>Clear selection</Button>
              </Stack>
            </Stack>
          </Box>
          {error && <Alert severity="error">{error}</Alert>}
          {result && <Alert severity="success"><Typography>API received {result.categories.length} categories:</Typography><Box component="pre" data-testid="accepted-categories" sx={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere", m: 0 }}>{JSON.stringify(result.categories)}</Box></Alert>}
        </Stack>
      </Container>
    </>
  );
}
