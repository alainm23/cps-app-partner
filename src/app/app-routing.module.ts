import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'supplies', loadChildren: './pages/supplies/supplies.module#SuppliesPageModule' },
  { path: 'oxygen-recharge', loadChildren: './pages/oxygen-recharge/oxygen-recharge.module#OxygenRechargePageModule' },
  { path: 'ads-material', loadChildren: './pages/ads-material/ads-material.module#AdsMaterialPageModule' },
  { path: 'trainings', loadChildren: './pages/trainings/trainings.module#TrainingsPageModule' },
  { path: 'occupational-exam', loadChildren: './pages/occupational-exam/occupational-exam.module#OccupationalExamPageModule' },
  { path: 'medical-kit', loadChildren: './pages/medical-kit/medical-kit.module#MedicalKitPageModule' },
  { path: 'visits', loadChildren: './pages/visits/visits.module#VisitsPageModule' },
  { path: 'appointment-date', loadChildren: './pages/appointment-date/appointment-date.module#AppointmentDatePageModule' },
  { path: 'appointment-specialty', loadChildren: './pages/appointment-specialty/appointment-specialty.module#AppointmentSpecialtyPageModule' },
  { path: 'appointment-checkout', loadChildren: './pages/appointment-checkout/appointment-checkout.module#AppointmentCheckoutPageModule' },
  { path: 'appointment-details', loadChildren: './pages/appointment-details/appointment-details.module#AppointmentDetailsPageModule' },
  { path: 'appointment-list', loadChildren: './pages/appointment-list/appointment-list.module#AppointmentListPageModule' },
  { path: 'emergency', loadChildren: './pages/emergency/emergency.module#EmergencyPageModule' },
  { path: 'ambulance', loadChildren: './pages/ambulance/ambulance.module#AmbulancePageModule' },
  { path: 'ambulance-check', loadChildren: './pages/ambulance-check/ambulance-check.module#AmbulanceCheckPageModule' },
  { path: 'oxygen-recharge-check', loadChildren: './pages/oxygen-recharge-check/oxygen-recharge-check.module#OxygenRechargeCheckPageModule' },
  { path: 'orders', loadChildren: './pages/orders/orders.module#OrdersPageModule' },
  { path: 'ads-material-check', loadChildren: './pages/ads-material-check/ads-material-check.module#AdsMaterialCheckPageModule' },
  { path: 'trainings-check', loadChildren: './pages/trainings-check/trainings-check.module#TrainingsCheckPageModule' },
  { path: 'visits-check', loadChildren: './pages/visits-check/visits-check.module#VisitsCheckPageModule' },
  { path: 'medical-kit-check', loadChildren: './pages/medical-kit-check/medical-kit-check.module#MedicalKitCheckPageModule' },
  { path: 'occupational-exam-check', loadChildren: './pages/occupational-exam-check/occupational-exam-check.module#OccupationalExamCheckPageModule' },
  { path: 'select-countries', loadChildren: './modals/select-countries/select-countries.module#SelectCountriesPageModule' },
  { path: 'home-doctor', loadChildren: './pages/home-doctor/home-doctor.module#HomeDoctorPageModule' },
  { path: 'home-nurse', loadChildren: './pages/home-nurse/home-nurse.module#HomeNursePageModule' },
  { path: 'home-doctor-check', loadChildren: './pages/home-doctor-check/home-doctor-check.module#HomeDoctorCheckPageModule' },
  { path: 'home-nurse-check', loadChildren: './pages/home-nurse-check/home-nurse-check.module#HomeNurseCheckPageModule' },
  { path: 'payment', loadChildren: './modals/payment/payment.module#PaymentPageModule' },
  { path: 'subcategorias', loadChildren: './modals/subcategorias/subcategorias.module#SubcategoriasPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
