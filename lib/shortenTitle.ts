export function shortenTitle(title:string, maxLength:number) {
    if (title.length <= maxLength) {
      return title;
    }
    return title.substring(0, maxLength - 3) + '...';
  }