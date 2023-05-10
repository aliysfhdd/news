export interface IResponseApi {
    status:      string;
    copyright:   string;
    num_results: number;
    results:     IResult[];
}

export interface IResult {
    uri:            string;
    url:            string;
    id:             number;
    asset_id:       number;
    source:         string;
    published_date: Date;
    updated:        Date;
    section:        string;
    subsection:     string;
    nytdsection:    string;
    adx_keywords:   string;
    column:         null;
    byline:         string;
    type:           string;
    title:          string;
    abstract:       string;
    des_facet:      string[];
    org_facet:      string[];
    per_facet:      string[];
    geo_facet:      string[];
    media:          IMedia[];
    eta_id:         number;
}

export interface IMedia {
    type:                     string;
    subtype:                  string;
    caption:                  string;
    copyright:                string;
    approved_for_syndication: number;
    "media-metadata":         IMediaMetadatum[];
}

export interface IMediaMetadatum {
    url:    string;
    format: string;
    height: number;
    width:  number;
}
