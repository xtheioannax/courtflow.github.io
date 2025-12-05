import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../theme-service/theme-service';
import { TeamService, TeamInfo } from '../team-service';
import { CommonModule } from '@angular/common';

interface Notification {
  id: number;
  text: string;
  time: string;
  unread: boolean;
}

type MenuKey = 'teams' | 'matches' | 'notifications' | 'profile' | null;

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  imports: [CommonModule]
})
export class Header implements OnInit {
  // Which menu is currently active (controls submenu bar)
  activeMenu: MenuKey = null;

  mobileMenuOpen = false;

  // Team data
  teamLogoUrl: string | null = null;
  teamName = 'CourtFlow Team';

  // User data (later: from auth service)
  userName = 'Alex Manager';
  userRole = 'Team Manager';

  notifications: Notification[] = [
    { id: 1, text: 'Training today at 20:00', time: '2h ago', unread: true },
    { id: 2, text: 'Match confirmed vs BlockBusters', time: '1d ago', unread: true },
    { id: 3, text: 'Lineup updated for Saturday', time: '3d ago', unread: false }
  ];

  constructor(
    private themeService: ThemeService,
    private teamService: TeamService
  ) {}

  ngOnInit(): void {
    this.teamService.getTeamInfo().subscribe({
      next: (team: TeamInfo) => {
        this.teamName = team.name;
        this.teamLogoUrl = team.logoUrl;
      },
      error: () => {
        this.teamLogoUrl = null;
      }
    });
  }

  setActiveMenu(menu: MenuKey): void {
    this.activeMenu = menu;
  }

  clearMenu(): void {
    this.activeMenu = null;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  get unreadNotifications(): number {
    return this.notifications.filter(n => n.unread).length;
  }

  markAllAsRead(): void {
    this.notifications = this.notifications.map(n => ({ ...n, unread: false }));
  }
}
