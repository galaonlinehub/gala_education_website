"use client";
import { Select, Spin } from "antd";
import { useState, useMemo, useCallback, useEffect } from "react";
import debounce from "lodash.debounce";
import { getPartnerSchools, usePaginationQuery } from "@/src/features/admin";

const PartnerSchoolSelect = ({value,onChange}) => {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [options, setOptions] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    const { data, isFetching } = usePaginationQuery(
        "partnerSchools",
        getPartnerSchools,
        page,
        { search }
    );

    useEffect(() => {
        if (!data) return;

        const newOptions = data.data.map((school) => ({
            label: school.name,
            value: school.id,
        }));

        if (page === 1) {
            setOptions(newOptions);
        } else {
            setOptions((prev) => {
                const ids = new Set(prev.map((o) => o.value));
                const filteredNew = newOptions.filter((o) => !ids.has(o.value));
                return [...prev, ...filteredNew];
            });
        }

        setHasMore(data.current_page < data.last_page);
    }, [data, page]);

    const debounceSearch = useMemo(
        () =>
            debounce((value) => {
                setSearch(value);
                setPage(1);
            }, 400),
        []
    );

    const handlePopupScroll = useCallback(
        (e) => {
            const target = e.target;
            if (
                target.scrollTop + target.offsetHeight >=
                target.scrollHeight - 10
            ) {
                if (hasMore && !isFetching) {
                    setPage((prev) => prev + 1);
                }
            }
        },
        [hasMore, isFetching]
    );

    useEffect(() => {
        return () => {
            debounceSearch.cancel();
        };
    }, [debounceSearch]);


      

    return (
        <Select
            showSearch
            filterOption={false}
            onSearch={debounceSearch}
            onPopupScroll={handlePopupScroll}
            options={options}
            loading={isFetching && page === 1}
            placeholder="Select a Partner School"
            style={{ width: "100%",height:"42px" }}
            notFoundContent={isFetching ? <Spin size="small" /> : null}
            allowClear
            value={value}
            onChange={onChange}
        />
    );
};

export default PartnerSchoolSelect;
