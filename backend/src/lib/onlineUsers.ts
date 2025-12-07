// utitlity for online user
export const onlineUsers = new Map<string, Set<string>>(); // Map is a built‑in object that stores key–value pairs the key can any type bt the values of key will not duplicate

/* onlineUsers = {
  "u123" => Set { "s1", "s2" }
}*/

export const addSocket = (userId: string, socketId: string) => {
  const set = onlineUsers.get(userId) ?? new Set<string>(); // if set already stored then u will  get that set if not then u get new empty set
  set.add(socketId); // then add the socket add into that set
  onlineUsers.set(userId, set); // add that set into onlineUser map
};

export const removeSocket = (userId: string, socketId: string) => {
  const set = onlineUsers.get(userId);
  if (!set) {
    return;
  }
  set.delete(socketId); // this will remove from particular device
  if (set.size === 0) onlineUsers.delete(userId);
  else onlineUsers.set(userId, set); // this keeps other device connected
};
