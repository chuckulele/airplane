import { Stack, Table, Text, Title, useComponentState } from "@airplane/views";

const ContentModerationDashboard = () => {
  const reviews = useComponentState("reviews");
  const selectedReview = reviews.selectedRow;
  return (
    <Stack>
      <Title>Content Moderation Dashboard</Title>
        <Stack>
          <Table
            id = "reviews"
            title = "Reviews"
            hiddenColumns = {["created_at", "product_id", "customer", "rating", "helpful_count", "approved"]}
            task = "list_reviews"
            rowSelection = "single"
          />

          { selectedReview && (
            <Table
              id = "review_approval"
              title = "Review approval"
              hiddenColumns = {["product_id", "product_id_2", "created_at_2", "image"]}
              task = {{
                slug: "list_reviews_and_product_data",
                params: { review_id: selectedReview.review_id },
              }}
              rowActions = {[
                {
                  slug: "approve_review",
                  label: "Approve",
                },
                {
                  slug: "reject_review",
                  label: "Reject",
                }
              ]}
            />
          )}
        </Stack>
    </Stack>
  );    
};


export default ContentModerationDashboard;