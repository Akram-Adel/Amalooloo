import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'mode-selection', pathMatch: 'full' },
  { path: 'mode-selection',  loadChildren: './mode-selection/mode-selection.module#ModeSelectionPageModule' },
  { path: 'login',           loadChildren: './login/login.module#LoginPageModule' },
  { path: 'forgot-pass',     loadChildren: './forgot-pass/forgot-pass.module#ForgotPassPageModule' },
  { path: 'signup',          loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'dashboard',       loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  { path: 'settings',        loadChildren: './settings/settings.module#SettingsPageModule' },
  { path: 'profile',         loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'tips',            loadChildren: './tips/tips.module#TipsPageModule' },
  { path: 'maintenance-req', loadChildren: './maintenance-req/maintenance-req.module#MaintenanceReqPageModule' },
  { path: 'bc-scanner',      loadChildren: './bc-scanner/bc-scanner.module#BcScannerPageModule' },
  { path: 'shop',            loadChildren: './shop/shop.module#ShopPageModule' },
  { path: 'notifications',   loadChildren: './notifications/notifications.module#NotificationsPageModule' },

  { path: 'loadsheets', loadChildren: './loadsheets/loadsheets.module#LoadsheetsPageModule' },
    { path: 'loadsheets/start-new-loadsheets',                loadChildren: './loadsheets/start-new-loadsheets/start-new-loadsheets.module#StartNewLoadsheetsPageModule' },
    { path: 'loadsheets/view-past-loadsheets',                loadChildren: './loadsheets/view-past-loadsheets/view-past-loadsheets.module#ViewPastLoadsheetsPageModule' },
    { path: 'loadsheets/loadsheets-details/:no',              loadChildren: './loadsheets/loadsheets-details/loadsheets-details.module#LoadsheetsDetailsPageModule' },

  { path: 'deliveries', loadChildren: './deliveries/deliveries.module#DeliveriesPageModule' },
    { path: 'deliveries/start-new-deliveries',    loadChildren: './deliveries/start-new-deliveries/start-new-deliveries.module#StartNewDeliveriesPageModule' },
    { path: 'deliveries/view-past-deliveries',    loadChildren: './deliveries/view-past-deliveries/view-past-deliveries.module#ViewPastDeliveriesPageModule' },
    { path: 'deliveries/delivery-details/:no',    loadChildren: './deliveries/delivery-details/delivery-details.module#DeliveryDetailsPageModule' },

    // Loadsheets && Deliveries
      { path: 'loadsheets/add-quantities-loaded/:id',         loadChildren: './loadsheets/add-quantities-loaded/add-quantities-loaded.module#AddQuantitiesLoadedPageModule' },
      { path: 'loadsheets/verify-quantities/:id',             loadChildren: './loadsheets/verify-quantities/verify-quantities.module#VerifyQuantitiesPageModule' },
      { path: 'loadsheets/loadsheets-feedback',               loadChildren: './loadsheets/loadsheets-feedback/loadsheets-feedback.module#LoadsheetsFeedbackPageModule' },
      { path: 'loadsheets/driver-details-loadsheet',          loadChildren: './loadsheets/driver-details-loadsheet/driver-details-loadsheet.module#DriverDetailsLoadsheetPageModule' },
      { path: 'loadsheets/betram-employee-loadsheet-details', loadChildren: './loadsheets/betram-employee-loadsheet-details/betram-employee-loadsheet-details.module#BetramEmployeeLoadsheetDetailsPageModule' },
    // Loadsheets && Deliveries
    { path: 'loadsheets/loadsheet-completed',         loadChildren: './loadsheets/loadsheet-completed/loadsheet-completed.module#LoadsheetCompletedPageModule' },
    { path: 'deliveries/delivery-contractor-details', loadChildren: './deliveries/delivery-contractor-details/delivery-contractor-details.module#DeliveryContractorDetailsPageModule' },
    { path: 'deliveries/delivery-completed',          loadChildren: './deliveries/delivery-completed/delivery-completed.module#DeliveryCompletedPageModule' },

  { path: 'construction', loadChildren: './construction/construction.module#ConstructionPageModule' },
    { path: 'construction/new-construction/:status',           loadChildren: './construction/new-construction/new-construction.module#NewConstructionPageModule' },
      { path: 'construction/contractor-list/:id',              loadChildren: './construction/contractor-list/contractor-list.module#ContractorListPageModule' },
      { path: 'construction/project-details/:id',              loadChildren: './construction/project-details/project-details.module#ProjectDetailsPageModule' },
      { path: 'construction/construction-view-completed/:id',  loadChildren: './construction/construction-view-completed/construction-view-completed.module#ConstructionViewCompletedPageModule' },
      { path: 'construction/begin-construction',               loadChildren: './construction/begin-construction/begin-construction.module#BeginConstructionPageModule' },
        { path: 'construction/question',                         loadChildren: './construction/question/question.module#QuestionPageModule' },
        { path: 'construction/construction-feedback',            loadChildren: './construction/construction-feedback/construction-feedback.module#ConstructionFeedbackPageModule' },
        { path: 'construction/construction-beneficiary-details', loadChildren: './construction/construction-beneficiary-details/construction-beneficiary-details.module#ConstructionBeneficiaryDetailsPageModule' },
        { path: 'construction/construction-contractor-details',  loadChildren: './construction/construction-contractor-details/construction-contractor-details.module#ConstructionContractorDetailsPageModule' },
        { path: 'construction/construction-betram-emp',          loadChildren: './construction/construction-betram-emp/construction-betram-emp.module#ConstructionBetramEmpPageModule' },
        { path: 'construction/construction-completed',           loadChildren: './construction/construction-completed/construction-completed.module#ConstructionCompletedPageModule' },
    { path: 'construction/view-past-construction',             loadChildren: './construction/view-past-construction/view-past-construction.module#ViewPastConstructionPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
