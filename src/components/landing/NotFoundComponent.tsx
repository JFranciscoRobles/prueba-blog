import React from "react";

type Props = {};

function NotFoundComponent({}: Props) {
  return (
    <div className="flex flex-col my-8">
      <h1 className="text-2xl font-bold text-center my-8">
        404 Not Found or you do not have permission to access this section.
      </h1>
    </div>
  );
}

export default NotFoundComponent;
