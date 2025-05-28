import React from "react";
import styles from "./BurgerMenu.module.css";

type BurgerMenuProps = {
  onClick: () => void;
  isOpened: boolean;
};

export const BurgerMenu = ({ onClick, isOpened }: BurgerMenuProps) => {
  return (
    <div className={styles.desktopHidden} onClick={onClick}>
      {isOpened ? (
        <svg
          width="16"
          height="14"
          viewBox="0 0 16 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 1C0 0.447715 0.447715 0 1 0H15C15.5523 0 16 0.447715 16 1C16 1.55228 15.5523 2 15 2H1C0.447715 2 0 1.55228 0 1Z"
            fill="#1C1C21"
          />
          <path
            d="M0 7C0 6.44772 0.447715 6 1 6H15C15.5523 6 16 6.44772 16 7C16 7.55228 15.5523 8 15 8H1C0.447715 8 0 7.55228 0 7Z"
            fill="#1C1C21"
          />
          <path
            d="M1 12C0.447715 12 0 12.4477 0 13C0 13.5523 0.447715 14 1 14H15C15.5523 14 16 13.5523 16 13C16 12.4477 15.5523 12 15 12H1Z"
            fill="#1C1C21"
          />
        </svg>
      ) : (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.364 7.05025C18.7545 6.65972 18.7545 6.02656 18.364 5.63603C17.9734 5.24551 17.3403 5.24551 16.9497 5.63603L12 10.5858L7.05026 5.63606C6.65974 5.24554 6.02657 5.24554 5.63605 5.63606C5.24553 6.02659 5.24553 6.65975 5.63605 7.05028L10.5858 12L5.63603 16.9497C5.24551 17.3403 5.24551 17.9734 5.63603 18.364C6.02656 18.7545 6.65972 18.7545 7.05025 18.364L12 13.4142L16.9498 18.364C17.3403 18.7545 17.9734 18.7545 18.364 18.364C18.7545 17.9735 18.7545 17.3403 18.364 16.9498L13.4142 12L18.364 7.05025Z"
            fill="#1C1C21"
          />
        </svg>
      )}
    </div>
  );
};
