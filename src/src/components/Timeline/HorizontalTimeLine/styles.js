function horizontalTimelineItem(theme, ownerState) {
  const { borders } = theme;
  const { lastItem, isDark } = ownerState;

  const { borderWidth, borderColor } = borders;

  return {
    "&:after": {
      content: !lastItem && "''",
      position: "absolute",
      top: "2rem",
      left: "0",
      width: "100%",
      opacity: isDark ? 0.1 : 1,
      borderBottom: `${borderWidth[2]} solid ${borderColor}`
    }
  };
}

export default horizontalTimelineItem;
