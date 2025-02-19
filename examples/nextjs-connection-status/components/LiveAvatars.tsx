"use client";

import React, { CSSProperties } from "react";
import { useOthers, useSelf } from "@/liveblocks.config";
import styles from "./LiveAvatars.module.css";

const IMAGE_SIZE = 44;

export function LiveAvatars() {
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > 3;

  return (
    <div
      className={styles.avatars}
      style={{ "--avatar-size": IMAGE_SIZE } as CSSProperties}
    >
      {users.slice(0, 3).map(({ connectionId, info }) => {
        return (
          <Avatar
            key={connectionId}
            picture={`https://liveblocks.io/avatars/avatar-${Math.floor(
              connectionId % 30
            )}.png`}
          />
        );
      })}

      {hasMoreUsers && <div className={styles.avatar}>+{users.length - 3}</div>}

      {currentUser && (
        <div className={styles.you}>
          <Avatar
            picture={`https://liveblocks.io/avatars/avatar-${Math.floor(
              currentUser.connectionId % 30
            )}.png`}
          />
        </div>
      )}
    </div>
  );
}

function Avatar({ picture }: { picture: string }) {
  return (
    <div className={styles.avatar} data-tooltip={name}>
      <img
        src={picture}
        height={IMAGE_SIZE}
        width={IMAGE_SIZE}
        className={styles.avatar_picture}
      />
    </div>
  );
}
