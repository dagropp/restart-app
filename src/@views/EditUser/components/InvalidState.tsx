import Button from '@common/Button';
import Typography from '@common/Typography';
import SentimentVeryDissatisfiedRoundedIcon from '@mui/icons-material/SentimentVeryDissatisfiedRounded';

const InvalidState = () => {
  return (
    <div className="flex flex-col gap-2 w-full items-center text-center">
      <Typography variant="h6">Your sign-up link is invalid</Typography>
      <SentimentVeryDissatisfiedRoundedIcon
        fontSize="large"
        className="mt-5 mb-5"
      />
      <Button link="/">Login</Button>
      <Typography variant="caption" className="text-balance">
        If you continue to experience issues, please contact our support team.
      </Typography>
    </div>
  );
};

export default InvalidState;
