import {jobSearchAPI} from "../../services/axios";

export default (state, updateState, loaderSetters, pushToast, pushJobs) => {
    return ({
        jobSearch: async (query, isFetchMore = false) => {
            try {
                loaderSetters.setJobSearchLoader(true);
                const {data: {data}} = await jobSearchAPI(query);
                if(isFetchMore) {
                    pushJobs(data.jobs, !!data.jobs.length)
                }
                else {
                    updateState({
                        jobResult: data.jobs,
                        hasMoreItems: !!data.jobs.length
                    })
                }
            } catch (e) {
                pushToast({text: e?.response?.data?.message || "An error occurred!", variant: "danger"})
            } finally {
                loaderSetters.setJobSearchLoader(false)
            }
        },
        clearJobResults: () => {
            updateState({jobResult: []})
        }
    })
}
