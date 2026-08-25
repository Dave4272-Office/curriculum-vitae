"use client";

import { Buffer } from "buffer";

type PropType = {
  values: string[];
  prefix?: string;
  postfix?: string;
};

export const AnimatedHeadline = (props: PropType) => {
  const visibleChild = props.values.map((value, index) => {
    const key = Buffer.from(value, "binary").toString("base64");
    return (
      <b className={index === 0 ? "is-visible" : "is-hidden"} key={key}>
        {value}
      </b>
    );
  });

  const prefixWithTags = props.prefix ? <span>{props.prefix}</span> : "";

  const postfixWithTags = props.postfix ? <span>{props.postfix}</span> : "";

  return (
    <section className="cd-intro">
      <span className={"cd-headline loading-bar"}>
        {prefixWithTags}
        <span className="cd-words-wrapper">{visibleChild}</span>
        {postfixWithTags}
      </span>
    </section>
  );
};
