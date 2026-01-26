import  CircularProgress  from "@mui/material/CircularProgress";
import styles from './css/loader.module.scss'
export const Loader = () => (
  <div className={styles.LoaderContainer}
  >
    <CircularProgress />
  </div>
);
