"use client";
import styles from "./ErrorScreen.module.css";

interface ErrorScreenProps {
  error?: string;
}

export const ErrorScreen = ({
  error = "Something went wrong",
}: ErrorScreenProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Oops!</h1>
        <p className={styles.message}>{error}</p>
      </div>
    </div>
  );
};
