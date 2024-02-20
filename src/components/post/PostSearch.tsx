"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const PostSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchValue, setSearchValue] = useState<string | undefined>(
    searchParams?.get("search") || ""
  );

  const createQueryString = React.useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return newSearchParams.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    const updatedSearchValue = searchValue?.trim();

    router.push(
      `${pathname}?${createQueryString({
        search: updatedSearchValue || null,
        page: 0,
        limit: 4,
      })}`,
      {
        scroll: false,
      }
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  return (
    <div>
      <Input
        placeholder={`Search by title, content, author...`}
        className="w-full my-4"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
};

export default PostSearch;
