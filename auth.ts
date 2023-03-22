export interface UserInfo {
  isAdmin: boolean;
  isUser: boolean;
  isSul: boolean;
  isTeamLead: boolean;
  isManagingDirector: boolean;
  name: string;
  tenant: Tenant;
  objectId: string;
  city?: string;
}

export enum Tenant {
  Esk = 0,
  Ede = 1,
  Ero = 2,
}

export class AuthorizationPolicy {
  public static evaluate(
    policyName: PolicyNames,
    userInfo: UserInfo | undefined
  ) {
    if (!userInfo) {
      return false;
    }

    return AuthorizationPolicy[policyName](userInfo);
  }

  public static edeTenant(user: UserInfo | null | undefined): boolean {
    if (!user) {
      return false;
    }

    return user.tenant === Tenant.Ede;
  }

  public static eskTenant(user: UserInfo | null | undefined): boolean {
    if (!user) {
      return false;
    }

    return (
      user.tenant === Tenant.Esk ||
      user.objectId === "9041e544-d586-4a4b-bf3d-e0e966ff02d4"
    );
  }

  public static eroTenant(user: UserInfo | null | undefined): boolean {
    if (!user) {
      return false;
    }

    return user.tenant === Tenant.Ero;
  }

  public static canAccessBench(user: UserInfo | null | undefined): boolean {
    const authorizedTenant = this.eskTenant(user) || this.eroTenant(user);
    if (!authorizedTenant) {
      return false;
    }

    return AuthorizationPolicy.isAdminOrSulOrMd(user);
  }

  public static canAccessCustomers(user: UserInfo | null | undefined): boolean {
    const authorizedTenant = this.eskTenant(user) || this.eroTenant(user);
    if (!authorizedTenant) {
      return false;
    }

    return AuthorizationPolicy.isAdminOrSul(user);
  }

  public static canAccessProjectTeams(
    user: UserInfo | null | undefined
  ): boolean {
    const authorizedTenant = this.eskTenant(user) || this.eroTenant(user);
    if (!authorizedTenant) {
      return false;
    }

    return AuthorizationPolicy.isAdminOrSul(user);
  }

  public static canAccessAbsenceRequests(
    user: UserInfo | null | undefined
  ): boolean {
    if (!user) {
      return false;
    }

    return this.eskTenant(user) || this.edeTenant(user) || this.eroTenant(user);
  }

  public static canAccessRemainingHolidays(
    user: UserInfo | null | undefined
  ): boolean {
    if (!user) {
      return false;
    }

    return (
      (this.eskTenant(user) || this.edeTenant(user) || this.eroTenant(user)) &&
      AuthorizationPolicy.evaluate("isAdminOrSulOrTeamLead", user)
    );
  }

  public static isAdmin(user: UserInfo | null | undefined): boolean {
    if (!user) {
      return false;
    }

    return user.isAdmin;
  }

  public static isAdminOrSul(user: UserInfo | null | undefined): boolean {
    if (!user) {
      return false;
    }

    return user.isAdmin || user.isSul;
  }

  public static isAdminOrSulOrMd(user: UserInfo | null | undefined): boolean {
    if (!user) {
      return false;
    }

    return user.isAdmin || user.isSul || user.isManagingDirector;
  }

  public static isAdminOrSulOrTeamLead(
    user: UserInfo | null | undefined
  ): boolean {
    if (!user) {
      return false;
    }

    return user.isSul || user.isTeamLead || user.isAdmin;
  }

  public static isEdeAdmin(user: UserInfo | null | undefined): boolean {
    if (!user) {
      return false;
    }

    return user.isAdmin && this.edeTenant(user);
  }

  public static isEroAdmin(user: UserInfo | null | undefined): boolean {
    if (!user) {
      return false;
    }

    return user.isAdmin && this.eroTenant(user);
  }

  public static isEskAdmin(user: UserInfo | null | undefined): boolean {
    if (!user) {
      return false;
    }

    return user.isAdmin && this.eskTenant(user);
  }

  public static isAuthenticated(user: UserInfo | null | undefined): boolean {
    if (!user) {
      return false;
    }

    return user.isUser;
  }
}

type PolicyFunction = (scope: UserInfo | null | undefined) => boolean;

type AuthorizationPolicyPrototype = typeof AuthorizationPolicy;

type PolicyFunctions = {
  [P in keyof AuthorizationPolicyPrototype as AuthorizationPolicyPrototype[P] extends PolicyFunction
    ? P
    : never]: AuthorizationPolicyPrototype[P];
};

export type PolicyNames = keyof PolicyFunctions;

const p1: PolicyNames = 'isRich';
const p2: PolicyNames = 'eskTenant'