"use client";

import { ReactNode, useState } from "react";

const HaImage = ({
  src,
  loadingIndicator,
  errorIndicator,
  className,
}: {
  src: string;
  loadingIndicator?: ReactNode;
  errorIndicator?: ReactNode;
  className?: string;
}) => {
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  return (
    <>
      <div className={""}>
        {hasError && errorIndicator
          ? errorIndicator
          : loading && loadingIndicator
            ? loadingIndicator
            : null}
      </div>
      <img
        src={src}
        alt={""}
        className={`${className ?? ""} ${hasError || loading ? "hidden" : ""}`}
        onLoad={() => {
          setLoading(false);
        }}
        onError={() => {
          setHasError(false);
        }}
      />
    </>
  );
};

export default HaImage;
