import Container from "./container";
import cn from "classnames";

type AlertContent = {
  preview: {
    message: string;
    linkText: string;
    linkHref: string;
  };
  default: {
    message: string;
    linkText: string;
    linkHref: string;
  };
};

const alertContent: AlertContent = {
  preview: {
    message: "This page is a preview.",
    linkText: "Click here",
    linkHref: "/api/exit-preview",
  },
  default: {
    message: "The source code for this blog is",
    linkText: "available on GitHub",
    linkHref: "https://github.com/vercel/next.js/tree/canary/examples/",
  },
};

type Props = {
  preview?: boolean;
};

const Alert = ({ preview }: Props) => {
  const { message, linkText, linkHref } = preview
    ? alertContent.preview
    : alertContent.default;

  return (
    <div
      className={cn("border-b", {
        "bg-neutral-800 border-neutral-800 text-white": preview,
        "bg-neutral-50 border-neutral-200": !preview,
      })}
    >
      <Container>
        <div className="py-2 text-center text-sm">
          {message}{" "}
          <a
            href={linkHref}
            className={cn("underline duration-200 transition-colors", {
              "hover:text-teal-300": preview,
              "hover:text-blue-600": !preview,
            })}
          >
            {linkText}
          </a>
          {!preview && "."}
        </div>
      </Container>
    </div>
  );
};

export default Alert;