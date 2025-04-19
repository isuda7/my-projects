import * as React from "react";

import {
  Grid,
  GridColumn as Column,
  GridFilterChangeEvent,
} from "@progress/kendo-react-grid";
import { filterBy } from "@progress/kendo-data-query";
import { CompositeFilterDescriptor } from "@progress/kendo-data-query";
import { sampleProducts } from "./sample-products";

const initialFilter: CompositeFilterDescriptor = {
  logic: "and",
  filters: [{ field: "ProductName", operator: "contains", value: "Chef" }],
};

export default function uiGrid() {
  const [filter, setFilter] = React.useState(initialFilter);
  return (
    <>
      {/* <h2 className="k-mt-14">Grid</h2>
      <hr className="k-mt-4 k-mb-4" /> */}

      <Grid
        style={{ height: "300px" }}
        data={filterBy(sampleProducts, filter)}
        filterable={true}
        filter={filter}
        onFilterChange={(e: GridFilterChangeEvent) => setFilter(e.filter)}
        pageable={{
          pageSizes: true,
        }}
      >
        <Column field="ProductID" title="ID" filterable={false} width="60" />
        <Column field="ProductName" title="Product Name" />
        <Column field="FirstOrderedOn" filter="date" format="{0:d}" />
        <Column field="UnitPrice" filter="numeric" format="{0:c}" width="220" />
        <Column field="Discontinued" filter="boolean" />
      </Grid>
    </>
  );
}
