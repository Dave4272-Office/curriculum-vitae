import React from "react";
import "./index.sass";

type PropType = {
  values: string[];
  prefix?: string;
  postfix?: string;
};

type StateType = {
  visibleChild: any[];
};

export class AnimatedHeadline extends React.Component<PropType, StateType> {
  constructor(props: PropType | Readonly<PropType>) {
    super(props);

    this.state = {
      visibleChild: [],
    };
  }

  initHeadline = () => {
    var mh: JSX.Element[] = [];
    this.props.values.forEach((value, index) => {
      mh.push(
        <b className={index === 0 ? "is-visible" : "is-hidden"} key={index}>
          {value}
        </b>
      );
    });
    this.setState({ visibleChild: mh });
  };

  componentDidMount = () => {
    this.initHeadline();
  };

  render() {
    let prefixWithTags = this.props.prefix ? (
      <span>{this.props.prefix}</span>
    ) : (
      ""
    );

    let postfixWithTags = this.props.postfix ? (
      <span>{this.props.postfix}</span>
    ) : (
      ""
    );

    return (
      <>
        <section className="cd-intro">
          <span className={"cd-headline loading-bar"}>
            {prefixWithTags}
            <span className="cd-words-wrapper">{this.state.visibleChild}</span>
            {postfixWithTags}
          </span>
        </section>
      </>
    );
  }
}
