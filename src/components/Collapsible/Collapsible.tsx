import React, { FC, useState, useContext, createContext, ButtonHTMLAttributes, HTMLAttributes } from "react";
import classnames from "classnames"

// setter default state for å gjøre typescript fornøyd
const Context = createContext({
  isOpen: false,
  triggerId: "",
  contentId: "",
  toggleOpen() { }
});

type BaseProps = {
  as?: keyof HTMLElementTagNameMap
  children?: React.ReactNode
  className?: string
}

type RootProps = {
  isOpen?: boolean  
} & BaseProps & HTMLAttributes<HTMLElement>
/** Root noden initialiserer state for resten av barna */
export const Root: FC<RootProps> = (props) => {
  const { as = "div", children, isOpen = false, ...rest } = props;

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

  return React.createElement(as, {
    ...rest,
    ["data-open"]: sharedState.isOpen,
  },
    <Context.Provider value={sharedState}>
      {children}
    </Context.Provider>
  )
}

type TriggerProps = Omit<BaseProps, "as"> & ButtonHTMLAttributes<HTMLButtonElement>
/** Trigger er kun en ustylet knapp som som har ansvar for å åpne/lukke collapsible componenten */
export const Trigger: FC<TriggerProps> = (props) => {
  const {children, ...rest} = props
  const sharedState = useContext(Context)

  return <button
    {...rest}
    data-open={sharedState.isOpen}
    id={sharedState.triggerId}
    className={classnames(props.className)}
    aria-controls={sharedState.contentId}
    aria-expanded={sharedState.isOpen}
    onClick={sharedState.toggleOpen}
  >
    {children}
  </button>
}

type ContentProps = BaseProps & HTMLAttributes<HTMLElement>
export const Content: FC<ContentProps> = (props) => {
  const { as = "div", children, ...rest } = props
  const sharedState = useContext(Context)

  return React.createElement(as, {
    ...rest,
    role: "region",
    ["data-open"]: sharedState.isOpen,
    ["aria-labelledby"]: sharedState.triggerId,
    id: sharedState.contentId,
    hidden: !sharedState.isOpen,
  },
    children
  )
}