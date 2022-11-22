export const uniqueOption=(balance,el)=>{
    const unique = [...new Set(balance.map(item => item.name))];
    return unique
}