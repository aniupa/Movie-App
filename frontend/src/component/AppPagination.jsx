import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function AppPagination({
  page,
  count,
  onChange,
  sx = {},
}) {
  return (
    <Stack alignItems="center" my={4} sx={sx}>
      <Pagination
        page={page}
        count={count}
        onChange={onChange}
        color="primary"
        size="large"
      />
    </Stack>
  );
}
