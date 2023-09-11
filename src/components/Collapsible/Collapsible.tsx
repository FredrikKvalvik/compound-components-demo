import React, { FC, useState, useContext, createContext } from "react";

import classnames from "classnames/bind"
import styles from "./Collapsible.module.scss"

// setter default state for å gjøre typescript fornøyd
const Context = createContext({
  isOpen: false,
  triggerId: "",
  contentId: "",
  toggleOpen() { }
});

// forenkler styling ved hjelp av sass moduler
const cx = classnames.bind(styles);

// latskap for å gjøre ts happy
type Props = {
  [x: string]: any
}

export const Root: FC<Props> = (props) => {
  const { as = "div", children, isOpen = false, containerProps = {} } = props;

  const [sharedState, setSharedState] = useState({
    isOpen,
    triggerId: crypto.randomUUID(),
    contentId: crypto.randomUUID(),
    toggleOpen() {
      setSharedState(updated => {
        return { ...updated, isOpen: !updated.isOpen };
      });
    }
  })

  return React.createElement(as, containerProps,
    <div data-open={sharedState.isOpen} className={cx("root")}>
      <Context.Provider value={sharedState}>
        {children}
      </Context.Provider>
    </div>
  )
}

export const Trigger: FC<Props> = (props) => {
  const ctx = useContext(Context)
  const { as = "h2", children, containerProps = {}, buttonProps = {} } = props
  // const { triggerId, contentId, toggleOpen, isOpen } = useContext(Context)

  // return React.createElement(as, {
  //   className: cx("trigger__container", containerProps.className),
  // },
  return <button
    data-open={ctx.isOpen}
    className={cx("trigger", buttonProps.className)}
    id={ctx.triggerId}
    aria-controls={ctx.contentId}
    aria-expanded={ctx.isOpen}
    onClick={ctx.toggleOpen}
  >
    {children}
  </button>
  // )
}

export const Content: FC<Props> = (props) => {
  const { as = "div", children } = props

  const ctx = useContext(Context)
  // const { triggerId, contentId, isOpen } = useContext(Context)

  return React.createElement(as, {
    ["data-open"]: ctx.isOpen,
    role: "region",
    ["aria-labelledby"]: ctx.triggerId,
    id: ctx.contentId,
    hidden: !ctx.isOpen
  },
    children
  )
}