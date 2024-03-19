import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { AnimationPerson } from "assets/images";

function MessageFooterItem() {
  return (
    <Box
      paddingY="0.5rem"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <img width="15%" src={AnimationPerson} alt="Welcome gif" />
      <Box>
        <Typography className="line-clamp-2 text-wrap" variant="body1" color="#667">
          Chào mừng bạn, hãy bắt đầu nhắn tin trao đổi và cùng học tập nhé!
        </Typography>
      </Box>
    </Box>
  );
}

MessageFooterItem.propTypes = {};

export default MessageFooterItem;
