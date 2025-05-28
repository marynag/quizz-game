import React from "react";
import styles from "./Button.module.css";

type ButtonProps = { text: string; onClick: () => void };

export const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <button onClick={onClick} className={styles.buttonPrimary}>
      <span className={styles.buttonText}>{text}</span>
    </button>
  );
};
