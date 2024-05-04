// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/circle-packing
import { ResponsiveCirclePacking } from "@nivo/circle-packing";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveCirclePacking = ({ data /* see data tab */ }: any) => {
  return (
    <div style={{ width: "auto", height: "800px" }}>
      <ResponsiveCirclePacking
        data={data}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        id="name"
        value="loc"
        colors={{ scheme: "nivo" }}
        childColor={{
          from: "color",
          modifiers: [["brighter", 0.4]],
        }}
        padding={20}
        leavesOnly={true}
        enableLabels={true}
        labelsFilter={(n) => 2 === n.node.depth}
        labelsSkipRadius={10}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.5]],
        }}
        defs={[
          {
            id: "lines",
            type: "patternLines",
            background: "none",
            color: "inherit",
            rotation: -45,
            lineWidth: 5,
            spacing: 8,
          },
        ]}
        fill={[
          {
            match: {
              depth: 1,
            },
            id: "lines",
          },
        ]}
      />
    </div>
  );
};

export default MyResponsiveCirclePacking;
