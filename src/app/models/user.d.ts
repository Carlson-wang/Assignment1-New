export class User {
    username: string;
    password: string;
    email: string;
    valid: string;
    isActivated: string;
    ofSuperAdminInRole: boolean;
    ofGroupAdminInRole: boolean;
    ofGroupAssistInRole: boolean;
    groupList: [];
    adminGroupList: [];
}
