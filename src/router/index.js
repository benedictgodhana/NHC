  import { createRouter, createWebHistory } from 'vue-router';
  import HomeView from '../views/HomeView.vue';
  import About from '../views/AboutView.vue';
  import Community from '../views/CommunityPage.vue';
  import Calendar from '../views/CalendarPage.vue';
  import LoginView from '../views/Auth/LoginView.vue';
  import DashboardView from '../views/Admin/DashboardPage.vue';
  import RoutesPage from '../views/Admin/Routes.vue';
  import TicketPage from '../views/Admin/BookedTickets.vue';
  import CardPage from '../views/Admin/CardHolder.vue';
  import CardTopup from '../views/Admin/CardTopup.vue';
  import Users from '../views/Admin/ManageUser.vue';




  import DocumentPage from '@/components/DocumentPage.vue'; // Import your document page component

  import ManageUsers from '@/views/Admin/ManageUser.vue'; // Adjust the import path as needed
  import Profile from '@/views/Admin/Profile.vue'; // Adjust the import path as needed

  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [



      {
        path: '/admin/manage-users',
        name: 'ManageUsers',
        component: ManageUsers
      },
      {
        path: '/admin/profile',
        name: 'Profile',
        component: Profile
      },
      {
        path: '/',
        name: 'home',
        redirect: '/login', // Automatically redirects to the login page
        meta: { requiresAuth: false }
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: DashboardView,
        meta: { requiresAuth: true }
      },

      {
        path: '/card_holders',
        name: 'cardholder',
        component: CardPage,
        meta: { requiresAuth: true }
      },


      {
        path: '/routes',
        name: 'routes',
        component: RoutesPage,
        meta: { requiresAuth: true }
      },

      {
        path: '/users',
        name: 'users',
        component: Users,
        meta: { requiresAuth: true }
      },


      {
        path: '/card_top_up',
        name: 'card_top_up',
        component: CardTopup,
        meta: { requiresAuth: true }
      },

      {
        path: '/book-tickets',
        name: 'tickets',
        component: TicketPage,
        meta: { requiresAuth: true }
      },
      {
        path: '/login',
        name: 'login',
        component: LoginView,
        meta: { requiresAuth: false }
      },
      {
        path: '/calendar_events',
        name: 'calendar',
        component: Calendar,
        meta: { requiresAuth: false }
      },
      {
        path: '/organization',
        name: 'organization',
        component: Community,
        meta: { requiresAuth: false }
      },
      {
        path: '/documents',
        name: 'documents',
        component: About,
        meta: { requiresAuth: false }
      },
      {
        path: '/documents/:categoryId',
        name: 'DocumentPage',
        component: DocumentPage,
        props: true, // Allow route params to be passed as props to the component
        meta: { requiresAuth: false }
      },
    ]
  });

  router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('token');
    if (to.meta.requiresAuth && !isAuthenticated) {
      next('/login');
    } else {
      next();
    }
  });

  export default router;
