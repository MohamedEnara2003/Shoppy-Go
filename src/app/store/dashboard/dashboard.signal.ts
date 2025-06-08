import { patchState, signalStoreFeature, withMethods, withState } from "@ngrx/signals"


interface DashboardState {
  isCollapsed: boolean;
}
const initialDashboardState : DashboardState  = {
  isCollapsed: false
}

export const DashboardStore =  signalStoreFeature(
    withState(initialDashboardState),
    withMethods((store) => ({
        toggleCollapse() {
          patchState(store, (state) => ({
            isCollapsed: !state.isCollapsed
          }));
        }
      }))
)