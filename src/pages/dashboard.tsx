import { type FC } from "react";
import { api } from "~/utils/api";

interface dashboardProps {}

const Dashboard: FC<dashboardProps> = ({}) => {
  const { mutate } = api.admin.sensitive.useMutation();

  return (
    <div>
      dashboard
      <button type="button" onClick={() => mutate()}>
        Secret action
      </button>
    </div>
  );
};

export default Dashboard;
