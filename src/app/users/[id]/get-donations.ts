import React from "react";

export function useGetDonationsByUser(wallet: string) {
  const [donations, setDonations] = React.useState<any>([]);

  async function fetchDonations(url: string) {
    const data = await fetch(url).then((res) => res.json());
    setDonations(data);
  }

  React.useEffect(() => {
    if (wallet) {
      fetchDonations(`/api/donations?wallet=${wallet}`);
    }
  }, [wallet]);

  return donations;
}
