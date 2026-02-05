import Pagination from "@mui/material/Pagination";

export default function AppPagination({ page, count, onChange, sx = {} }) {
  return (
    <div>
      <Pagination
        page={page}
        count={count}
        onChange={onChange}
        size="large"
        shape="circular"
        variant="text"
        color="primary"
        sx={{
          ...sx, // 👈 allows parent to override
        }}
      />
    </div>
  );
}
