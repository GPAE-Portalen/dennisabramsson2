export function scrollTo(elementId: string): void {
    var contactElement: HTMLElement | null = document.getElementById(elementId);
    if (contactElement) contactElement.scrollIntoView();
};