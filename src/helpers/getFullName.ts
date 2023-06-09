export function getFullName(user: User | null): string {
    return user ? user.fullName : 'Guest';
}
