import React from "react";
// import Grid from './components/grid';
import NumberLoading from './components/counter';
import styles from "./loadings.m.scss";

const Loadings = () => {
  return (
    <>
      <div className={styles.loadingContainer}>
        <ul>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              // xmlns:xlink="http://www.w3.org/1999/xlink"
              width="36"
              height="36"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid"
            >
              <g transform="translate(20 50)">
                <circle cx="0" cy="0" r="6" fill="#4a4a4a">
                  <animateTransform
                    attributeName="transform"
                    type="scale"
                    begin="-0.4934210526315789s"
                    calcMode="spline"
                    keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
                    values="0;1;0"
                    keyTimes="0;0.5;1"
                    dur="1.3157894736842106s"
                    repeatCount="indefinite"
                  ></animateTransform>
                </circle>
              </g>
              <g transform="translate(40 50)">
                <circle cx="0" cy="0" r="6" fill="#4a4a4a">
                  <animateTransform
                    attributeName="transform"
                    type="scale"
                    begin="-0.32894736842105265s"
                    calcMode="spline"
                    keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
                    values="0;1;0"
                    keyTimes="0;0.5;1"
                    dur="1.3157894736842106s"
                    repeatCount="indefinite"
                  ></animateTransform>
                </circle>
              </g>
              <g transform="translate(60 50)">
                <circle cx="0" cy="0" r="6" fill="#4a4a4a">
                  <animateTransform
                    attributeName="transform"
                    type="scale"
                    begin="-0.16447368421052633s"
                    calcMode="spline"
                    keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
                    values="0;1;0"
                    keyTimes="0;0.5;1"
                    dur="1.3157894736842106s"
                    repeatCount="indefinite"
                  ></animateTransform>
                </circle>
              </g>
              <g transform="translate(80 50)">
                <circle cx="0" cy="0" r="6" fill="#4a4a4a">
                  <animateTransform
                    attributeName="transform"
                    type="scale"
                    begin="0s"
                    calcMode="spline"
                    keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
                    values="0;1;0"
                    keyTimes="0;0.5;1"
                    dur="1.3157894736842106s"
                    repeatCount="indefinite"
                  ></animateTransform>
                </circle>
              </g>
            </svg>
          </li>
          <li>
            <div className={styles["loader"]}>
              <div className={styles["loader-progress"]}></div>
              <div className={styles["loader-check-forward"]}></div>
              <div className={styles["loader-check"]}></div>
            </div>
          </li>
          <li className={styles["one"]}>
            <div className={styles["dot-loading"]}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </li>
          <li className={styles["two"]}>
            <div className={styles['loader-wrapper']}>
              <span className={styles['loader-inner']}></span>
            </div>
          </li>
          <li className={styles["three"]}>
            <NumberLoading />
          </li>
          <li className={styles["four"]}>6</li>
          <li className={styles["five"]}>7</li>
          <li className={styles["six"]}>8</li>
          <li className={styles["seven"]}>9</li>
          <li className={styles["eight"]}>10</li>
          <li className={styles["nine"]}>11</li>
        </ul>
      </div>
      {/* <Grid /> */}
    </>
  );
};

export default Loadings;
