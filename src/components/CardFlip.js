import React from "react";

export default ({ counter, success }) => {
  return (
    <div style={styles.cardContainer}>
      <div style={Object.assign({}, styles.card, counter === 0 && styles.success)}>
        <div style={{...styles.fontAndBack, ...styles.front}}>{counter}</div>
        <div style={{...styles.fontAndBack, ...styles.back}}>{success}</div>
      </div>
    </div>
  );
};

const styles = {
    cardContainer: {
      "perspective": "700px",
      "zIndex": "1",
    },
    card: {
      "margin": "13px",
      "transition": "all 0.6s ease",
      "transformStyle": "preserve-3d",
      "width": "25px",
      "height": "25px",
      "position": "relative",
      "fontWeight": "bold",
      "textAlign": "center",
      "lineHeight": "2.3em",
      "color": "white",
      "fontSize": "11px"
    },
    fontAndBack: {
      "width": "25px",
      "height": "25px",
      "position": "absolute",
      "backfaceVisibility": "hidden",
      "border": "6px solid white",
      "boxShadow": "0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12)",
      "left": "-6px",
      "top": '-6px',
      "borderRadius": "50%"
    },
    front: {
      "background": "#ec6761",
    },
    back: {
      "background": "#e8e0d3",
      "transform": "rotateY(180deg)",
      "color": "#00b7bd"
    },
    success: {
      "transform": "rotateY(180deg)"
    }
}