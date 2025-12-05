import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TeamInfo {
  name: string;
  logoUrl: string | null;
}

@Injectable({ providedIn: 'root' })
export class TeamService {
    constructor(private http: HttpClient) {}

    // Adjust URL to match your backend
    getTeamInfo(): Observable<TeamInfo> {
        return this.http.get<TeamInfo>('/api/team');
    }
}
