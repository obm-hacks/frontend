import React, { FC } from 'react';

interface UserInfoProps {
  contributionMoney?: number;
  contributionPeriod?: number;
}

export const UserInfo: FC<UserInfoProps> = ({ contributionMoney, contributionPeriod }) => {
  if (!contributionMoney || !contributionPeriod) {
    return null;
  }


  return <div>
    User Info
  </div>;
};