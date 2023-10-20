import React from 'react';

import PropTypes from 'prop-types';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {STYLE_CONSTANTS} from "../../config/config";
import {TagWrapper} from "./styles";

library.add(faTimes);

const Tag = ({id, tagText, onClose, width, toClose, className}) => {
  return (
    <TagWrapper className={className}>
      <div className="tag">
				<span>
					{typeof tagText === "function" ? tagText() : tagText}
				</span>
        {
          toClose &&
          <span
            className="close-container"
            onClick={onClose.bind(this, id)}
          >
						<FontAwesomeIcon
              icon={"times"}
              color={STYLE_CONSTANTS.BACKGROUND_AND_BORDERS.GREY_DARK}
            />
					</span>
        }
      </div>
    </TagWrapper>
  )
};

Tag.propTypes = {
  id: PropTypes.number.isRequired,
  tagText: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  onClose: PropTypes.func,
  toClose: PropTypes.bool,
  width: PropTypes.string,
  styles: PropTypes.object
};
Tag.defaultProps = {
  id: -1,
  tagText: "Default Tag",
  onClose: () => console.log('Tag on close'),
  width: undefined,
  toClose: true
};

export default Tag
