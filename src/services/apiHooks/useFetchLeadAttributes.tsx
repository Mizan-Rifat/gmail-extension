import useSWR from "swr";
import axiosFetcher from "../axiosFetcher";
import paths from "../paths";
import { LeadAttributes } from "@root/src/pages/content/types";

const useFetchLeadAttributes = (id: string) => {
  const { data, error, isLoading } = useSWR<{ data: LeadAttributes }>(
    id ? paths.getLeadAttributes(id) : null,
    axiosFetcher
  );

  console.log({ data });

  return {
    // attributes: data?.data || {
    //   leadIndustries: [],
    //   leadOpportunityStages: [],
    //   leadSources: [],
    //   leadTags: [],
    // },
    attributes: {
      leadIndustries: [
        {
          id: "clohn5bou000g96kph3jahbpe",
          name: "Software Development",
          businessId: "clohmmcja000496kp4526lx5w",
          createdAt: "2023-11-02T20:30:26.670Z",
          updatedAt: "2023-11-02T20:30:26.670Z",
        },
        {
          id: "clohob2pl000p96kp7v2w8vll",
          name: "Supply Chain & Logistics",
          businessId: "clohmmcja000496kp4526lx5w",
          createdAt: "2023-11-02T21:02:54.586Z",
          updatedAt: "2023-11-02T21:02:54.586Z",
        },
      ],
      leadOpportunityStages: [
        {
          id: "clohmmcjj000796kpwoisx02l",
          stageName: "Initial",
          stageNo: 1,
          isFolded: false,
          businessId: "clohmmcja000496kp4526lx5w",
          createdAt: "2023-11-02T20:15:41.311Z",
          updatedAt: "2023-11-20T12:22:16.133Z",
        },
        {
          id: "cloioahis002k96kpymdm2650",
          stageName: "Meeting Scheduled",
          stageNo: 2,
          isFolded: false,
          businessId: "clohmmcja000496kp4526lx5w",
          createdAt: "2023-11-03T13:50:13.301Z",
          updatedAt: "2023-11-03T13:50:13.301Z",
        },
      ],
      leadSources: [
        {
          id: "clohn4rm6000e96kpd8mogdn4",
          name: "GetBootstrap",
          businessId: "clohmmcja000496kp4526lx5w",
          createdAt: "2023-11-02T20:30:00.654Z",
          updatedAt: "2023-11-02T20:30:00.654Z",
        },
        {
          id: "cloho661m000n96kpkmrnpwe4",
          name: "ThemeWagon",
          businessId: "clohmmcja000496kp4526lx5w",
          createdAt: "2023-11-02T20:59:05.626Z",
          updatedAt: "2023-11-02T20:59:05.626Z",
        },
      ],
      leadTags: [
        {
          id: "clohn4yu0000f96kpltkz28o5",
          name: "US Client",
          businessId: "clohmmcja000496kp4526lx5w",
          createdAt: "2023-11-02T20:30:10.008Z",
          updatedAt: "2023-11-02T20:30:10.008Z",
        },
        {
          id: "cloho6duf000o96kpsmm0bx4q",
          name: "UK Client",
          businessId: "clohmmcja000496kp4526lx5w",
          createdAt: "2023-11-02T20:59:15.735Z",
          updatedAt: "2023-11-02T20:59:15.735Z",
        },
      ],
    },

    isLoading,
    isError: error,
  };
};

export default useFetchLeadAttributes;
