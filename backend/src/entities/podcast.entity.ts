import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
} from 'typeorm';

@Entity('podcasts')
export class Podcast {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true, nullable: true })
    @Index()
    collectionId: number;

    @Column({ nullable: true })
    trackId: number;

    @Column({ type: 'text', nullable: true })
    trackName: string;

    @Column({ type: 'text', nullable: true })
    artistName: string;

    @Column({ type: 'text', nullable: true })
    collectionName: string;

    @Column({ type: 'text', nullable: true })
    artworkUrl30: string;

    @Column({ type: 'text', nullable: true })
    artworkUrl60: string;

    @Column({ type: 'text', nullable: true })
    artworkUrl100: string;

    @Column({ type: 'text', nullable: true })
    artworkUrl600: string;

    @Column({ type: 'timestamp', nullable: true })
    releaseDate: Date;

    @Column({ type: 'int', nullable: true })
    trackCount: number;

    @Column({ type: 'jsonb', nullable: true })
    genres: string[];

    @Column({ type: 'text', nullable: true })
    country: string;

    @Column({ type: 'text', nullable: true })
    feedUrl: string;

    @Column({ type: 'text', nullable: true })
    trackViewUrl: string;

    @Column({ type: 'text', nullable: true })
    collectionViewUrl: string;

    @Column({ type: 'text', nullable: true })
    primaryGenreName: string;

    @Column({ type: 'text', nullable: true })
    contentAdvisoryRating: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
